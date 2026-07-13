import Link from "next/link";

export const metadata = {
    title: "Privacy Policy",
};

export default function PrivacyPolicy() {
    return (
        <main className="mt-20 text-gray-800 ">
            <div className="max-w-4xl mx-auto px-6 py-20">

                {/* HEADER */}
                <h1 className="text-4xl font-bold">
                    Privacy Policy
                </h1>

                <p className="mt-4 text-sm text-gray-400">
                    Last updated: {new Date().toLocaleDateString()}
                </p>

                {/* INTRO */}
                <section className="mt-10 space-y-4 text-sm leading-7">
                    <p>
                        We value your privacy and are committed to protecting your personal
                        information. This Privacy Policy explains how we collect, use, and
                        safeguard your data when you use our website.
                    </p>
                </section>

                {/* INFO COLLECTION */}
                <section className="mt-10">
                    <h2 className="text-xl font-semibold">
                        1. Information We Collect
                    </h2>

                    <p className="mt-3 text-sm leading-7">
                        We may collect personal details such as name, email address, phone
                        number, and order information when you interact with our services.
                    </p>
                </section>

                {/* HOW WE USE */}
                <section className="mt-8">
                    <h2 className="text-xl font-semibold">
                        2. How We Use Your Information
                    </h2>

                    <ul className="mt-3 list-disc pl-5 space-y-2 text-sm">
                        <li>To process orders and transactions</li>
                        <li>To improve customer support</li>
                        <li>To send updates and notifications</li>
                        <li>To improve website experience</li>
                    </ul>
                </section>

                {/* COOKIES */}
                <section className="mt-8">
                    <h2 className="text-xl font-semibold">
                        3. Cookies
                    </h2>

                    <p className="mt-3 text-sm leading-7">
                        We use cookies to improve user experience, analyze traffic, and
                        personalize content.
                    </p>
                </section>

                {/* SECURITY */}
                <section className="mt-8">
                    <h2 className="text-xl font-semibold">
                        4. Data Security
                    </h2>

                    <p className="mt-3 text-sm leading-7">
                        We implement appropriate security measures to protect your data.
                        However, no method of transmission over the internet is 100% secure.
                    </p>
                </section>

                {/* CONTACT */}
                <section className="mt-8">
                    <h2 className="text-xl font-semibold">
                        5. Contact Us
                    </h2>

                    <p className="mt-3 text-sm leading-7">
                        If you have any questions about this Privacy Policy, feel free to
                        contact us.
                    </p>
                </section>

            </div>
        </main>
    );
}