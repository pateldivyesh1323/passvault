import React, { useCallback, useEffect, useState } from "react";
import { useUserAuth } from "../providers/UserAuthProvider";
import { PassFormInterface, PassInterface } from "../models/password";
import axios from "axios";
import toast from "react-hot-toast";
import { getErrorMsg } from "../utils/error";
import enviroment from "../enviroment";
import DeleteIcon from "@mui/icons-material/Delete";
import { Modal } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { decryptText, encryptText } from "../utils/passwordHandler";

const Passwords = (): React.ReactNode => {
    const { getAccessToken } = useUserAuth();

    const [passwords, setPasswords] = useState<PassInterface[] | null>();
    const [createOpen, setCreateOpen] = useState<boolean>(false);
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
    const [viewOpen, setViewOpen] = useState<boolean>(false);
    const [modalPass, setModalPass] = useState<PassInterface | null>();
    const [decryptedPass, setDecryptedPass] = useState<string>("");
    const [decryptionKey, setDecryptionKey] = useState<string>("");
    const [createPass, setCreatePass] = useState<PassFormInterface>({
        name: "",
        password: "",
        encryptionKey: "",
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchPasswords = useCallback(async () => {
        try {
            setIsLoading(true);
            const token = await getAccessToken();
            const res = await axios.get(
                `${enviroment.server_url}/api/password`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setPasswords(res.data);
        } catch (error) {
            toast.error(getErrorMsg(error));
        } finally {
            setIsLoading(false);
        }
    }, [getAccessToken]);

    const handleCreatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        const { name, password, encryptionKey } = createPass;
        if (!name || !password || !encryptionKey) {
            return toast("Please enter all credentials!");
        }
        try {
            const token = await getAccessToken();
            const encryptedPassword = encryptText(password, encryptionKey);
            await axios.post(
                `${enviroment.server_url}/api/password`,
                { name, password: encryptedPassword },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success("Successfully created password!");
            fetchPasswords();
            setCreatePass({
                name: "",
                password: "",
                encryptionKey: "",
            });
            setCreateOpen(false);
        } catch (error) {
            toast.error(getErrorMsg(error));
        }
    };

    const handleDecryption = (e: React.FormEvent) => {
        e.preventDefault();
        const decrypted: string = decryptText(
            modalPass?.password as string,
            decryptionKey
        );
        setDecryptedPass(decrypted);
        if (decrypted === "") {
            toast.error("Incorrect decryption key!");
        }
    };

    const handleDeletePassword = async () => {
        try {
            const token = await getAccessToken();
            await axios.delete(
                `${enviroment.server_url}/api/password/${modalPass?._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success("Successfully deleted password!");
            fetchPasswords();
            setDeleteOpen(false);
            setModalPass(null);
        } catch (error) {
            toast.error(getErrorMsg(error));
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(decryptedPass);
        toast.success("Copied to clipboard");
    };

    useEffect(() => {
        fetchPasswords();
    }, [fetchPasswords]);

    return (
        <section className="p-4 text-xl font-semibold w-[95vw] md:w-[80vw] m-auto">
            <div className="my-3 flex items-center justify-between">
                <div>Your Passwords</div>
                <button
                    className="bg-[#93B1A6] text-black p-2 rounded transition-all duration-300 font-medium text-base hover:bg-[#93b1a6bb]"
                    onClick={() => {
                        setCreateOpen(true);
                    }}
                >
                    Create new
                </button>
            </div>
            <hr />
            {isLoading ? (
                <div className="text-white font-semibold text-center my-4">
                    Loading....
                </div>
            ) : (
                <div className="my-4">
                    {passwords?.length ? (
                        passwords.map((password) => {
                            return (
                                <div
                                    key={password._id}
                                    className="p-4 my-2 bg-[#193c4f8f] cursor-pointer hover:shadow-[2px_2px_30px_2px_#93B1A6] rounded transition-all duration-200 flex items-center justify-between"
                                >
                                    <div className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[60%]">
                                        {password.name}
                                    </div>
                                    <div>
                                        <button
                                            className="mr-4"
                                            onClick={() => {
                                                setModalPass(password);
                                                setViewOpen(true);
                                            }}
                                        >
                                            <RemoveRedEyeIcon />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setModalPass(password);
                                                setDeleteOpen(true);
                                            }}
                                        >
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div>No passwords found!</div>
                    )}
                </div>
            )}
            {/* Create password modal */}
            <Modal
                open={createOpen}
                onClose={() => {
                    setModalPass(null);
                    setCreateOpen(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="flex items-center justify-center"
            >
                <div className="bg-[#5C8374] rounded p-5 mx-2 md:mx-0 text-lg w-[600px]">
                    <div className="text-center mb-6 max-w-[500px]">
                        Create new password
                    </div>
                    <form onSubmit={handleCreatePassword}>
                        <div className="mb-4">
                            <label htmlFor="name">Name: </label>
                            <input
                                type="text"
                                id="name"
                                className="rounded w-full bg-black px-2 py-1"
                                value={createPass.name}
                                onChange={(e) => {
                                    setCreatePass({
                                        ...createPass,
                                        name: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password">Password: </label>
                            <input
                                type="password"
                                id="password"
                                className="rounded w-full bg-black px-2 py-1"
                                value={createPass.password}
                                onChange={(e) => {
                                    setCreatePass({
                                        ...createPass,
                                        password: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="encrkey">Encryption key: </label>
                            <input
                                type="password"
                                id="encrkey"
                                className="rounded w-full bg-black px-2 py-1"
                                value={createPass.encryptionKey}
                                onChange={(e) => {
                                    setCreatePass({
                                        ...createPass,
                                        encryptionKey: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div className="float-right">
                            <button
                                type="submit"
                                className="p-1 rounded bg-[#183D3D] mr-4"
                            >
                                Create
                            </button>
                            <button
                                className="p-1 rounded bg-[#183D3D]"
                                onClick={() => {
                                    setCreateOpen(false);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
            {/* View password modal */}
            <Modal
                open={viewOpen}
                onClose={() => {
                    setModalPass(null);
                    setViewOpen(false);
                    setDecryptedPass("");
                    setDecryptionKey("");
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="flex items-center justify-center"
            >
                <div className="bg-[#5C8374] rounded p-5 mx-2 md:mx-0 text-lg w-[600px]">
                    <div>
                        Name :{" "}
                        <div className="bg-[#183D3D] p-2 mb-4 rounded">
                            {modalPass?.name}
                        </div>
                    </div>
                    <div className="break-all">
                        Encrypted password :{" "}
                        <div className="bg-[#183D3D] p-2 mb-4 rounded">
                            {modalPass?.password}
                        </div>
                    </div>
                    {!decryptedPass ? (
                        <form onSubmit={handleDecryption} className="mb-4">
                            <label htmlFor="decrkey">Decryption Key: </label>
                            <div>
                                <input
                                    type="text"
                                    id="decrkey"
                                    className="rounded mb-2 w-full md:w-[85%] px-2 py-1 bg-black mr-2"
                                    placeholder="Enter key here"
                                    value={decryptionKey}
                                    onChange={(e) => {
                                        setDecryptionKey(e.target.value);
                                    }}
                                />
                                <button
                                    className="p-1 rounded bg-[#183D3D]"
                                    type="submit"
                                >
                                    Decrypt
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div>
                            <div className="mb-2">
                                Password{" "}
                                <button
                                    className="bg-[#183D3D] text-sm p-1 rounded float-right"
                                    onClick={copyToClipboard}
                                >
                                    copy
                                </button>
                            </div>{" "}
                            <div className="p-2 bg-[#183D3D] rounded">
                                {decryptedPass}
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
            {/* Delete password modal */}
            <Modal
                open={deleteOpen}
                onClose={() => {
                    setModalPass(null);
                    setDeleteOpen(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="flex items-center justify-center"
            >
                <div className="bg-[#5C8374] rounded p-5 text-lg">
                    <div className="mb-4">
                        Are you sure you want to delete the password?
                    </div>
                    <div className="float-right">
                        <button
                            className="p-1 rounded bg-[#183D3D] mr-2"
                            onClick={handleDeletePassword}
                        >
                            Confirm
                        </button>
                        <button
                            className="p-1 rounded bg-[#183D3D]"
                            onClick={() => {
                                setDeleteOpen(false);
                            }}
                        >
                            cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </section>
    );
};

export default Passwords;
