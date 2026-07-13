import Link from "next/link";

export const metadata = {
    title: "Terms & Conditions",
};

export default function TermsCondition() {
    return (
        <main className="mt-20 text-gray-800">
            <div className="max-w-4xl mx-auto px-6 py-20">

                {/* HEADER */}
                <h1 className="text-4xl font-bold">
                    Terms & Conditions
                </h1>

                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Last updated: {new Date().toLocaleDateString()}
                </p>

                {/* INTRO */}
                <section className="mt-10 space-y-4 text-sm leading-7">
                    <p>
                        By accessing and using this website, you agree to be bound by these
                        Terms & Conditions. If you do not agree, please do not use our services.
                    </p>
                </section>

                {/* USE OF WEBSITE */}
                <section className="mt-10">
                    <h2 className="text-xl font-semibold">
                        1. Use of Website
                    </h2>

                    <p className="mt-3 text-sm leading-7">
                        You agree to use this website only for lawful purposes. You must not
                        use it in any way that may cause harm, damage, or restrict access to
                        other users.
                    </p>
                </section>

                {/* PRODUCTS / SERVICES */}
                <section className="mt-8">
                    <h2 className="text-xl font-semibold">
                        2. Products & Services
                    </h2>

                    <p className="mt-3 text-sm leading-7">
                        We reserve the right to modify, update, or discontinue any product or
                        service at any time without prior notice.
                    </p>
                </section>

                {/* ORDERS */}
                <section className="mt-8">
                    <h2 className="text-xl font-semibold">
                        3. Orders & Payments
                    </h2>

                    <p className="mt-3 text-sm leading-7">
                        All orders are subject to acceptance and availability. Prices may be
                        changed without notice. Payment must be completed before order
                        processing.
                    </p>
                </section>

                {/* LIMITATION */}
                <section className="mt-8">
                    <h2 className="text-xl font-semibold">
                        4. Limitation of Liability
                    </h2>

                    <p className="mt-3 text-sm leading-7">
                        We are not responsible for any direct, indirect, or incidental damages
                        arising from the use of our website or services.
                    </p>
                </section>

                {/* CHANGES */}
                <section className="mt-8">
                    <h2 className="text-xl font-semibold">
                        5. Changes to Terms
                    </h2>

                    <p className="mt-3 text-sm leading-7">
                        We may update these Terms & Conditions at any time. Continued use of
                        the website means you accept the updated terms.
                    </p>
                </section>

                {/* CONTACT */}
                <section className="mt-8">
                    <h2 className="text-xl font-semibold">
                        6. Contact Us
                    </h2>

                    <p className="mt-3 text-sm leading-7">
                        If you have any questions regarding these terms, please contact us.
                    </p>
                </section>

            </div>
        </main>
    );
}