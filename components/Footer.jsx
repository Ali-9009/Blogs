import Link from "next/link";
import Image from "next/image";
import {
    FaFacebookF,
    FaInstagram,
    FaPinterestP,
    FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { ArrowRight } from "lucide-react";
import Newsletter from "./Newsletter";

const links = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Term & Conditions", path: "/term" },
];

const links2 = [
    { name: "Dev", path: "#" },
    { name: "Tech", path: "#" },
];

export default async function Footer() {


    return (
        <footer className="bg-[#111] text-white">
            <div className="bg-[#181818]">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 md:grid-cols-3">
                    <div>
                        <FooterTitle title="About Us" />

                        <div className="relative mb-6">
                            <Image
                                src="/assets/logo.png"
                                alt="Website logo"
                                width={210}
                                height={58}
                                priority
                                className="h-9 w-auto max-w-36 object-contain brightness-0 invert sm:h-11 sm:max-w-47"
                            />
                        </div>

                        <p className="text-sm font-medium leading-7 text-white">
                            Soledad is one of the best WordPress themes for multipurpose.
                        </p>

                        <div>
                            <Newsletter />
                        </div>

                    </div>

                    <div>
                        <FooterTitle title="Policies" />

                        <ul className="mt-5 space-y-3">
                            {links.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.path}
                                        className="group inline-flex items-center gap-2 text-sm text-gray-200 hover:text-white transition"
                                    >
                                        <ArrowRight
                                            size={14}
                                            className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"
                                        />

                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <FooterTitle title="Categories" />

                        <ul className="mt-5 space-y-3">
                            {links2.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.path}
                                        className="group inline-flex items-center gap-2 text-sm text-gray-200 hover:text-white transition"
                                    >
                                        <ArrowRight
                                            size={14}
                                            className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"
                                        />

                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-[#111]">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 border-b border-[#262626] py-8">
                        <SocialLink icon={<FaFacebookF />} label="Facebook" bg="bg-blue-700" />
                        <SocialLink icon={<FaXTwitter />} label="Twitter" bg="bg-sky-500" />
                        <SocialLink icon={<FaInstagram />} label="Instagram" bg="bg-pink-600" />
                        <SocialLink icon={<FaPinterestP />} label="Pinterest" bg="bg-red-700" />
                        <SocialLink icon={<FaYoutube />} label="Youtube" bg="bg-red-600" />
                        <SocialLink icon={<MdEmail />} label="Email" bg="bg-blue-500" />
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterTitle({ title }) {
    return (
        <div className="mb-8">
            <h3 className="mb-3 text-base font-bold uppercase">{title}</h3>
            <div className="h-px w-full bg-[#3a3a3a]" />
        </div>
    );
}

function SocialLink({ icon, label, bg }) {
    return (
        <Link
            href="#"
            className="flex w-full items-center justify-start gap-3 text-sm font-bold uppercase text-gray-400 transition hover:text-white"
        >
            <span
                className={`${bg} flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-base text-white`}
            >
                {icon}
            </span>

            <span>{label}</span>
        </Link>
    );
}