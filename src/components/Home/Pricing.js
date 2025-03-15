
const pricingPlans = [
    {
        title: "2GB App",
        description: "Everything you need to start uploading!",
        price: "$0",
        period: "/month",
        features: [
            "2GB of storage *",
            "7 days of audit log retention",
            "Unlimited uploads and downloads",
            "(Probably) cheaper than a cup of coffee",
        ],
        footnote: "* Storage shared between all apps",
    },
    {
        title: "100GB App",
        description: "For those with teams or more than 2 gigs of files",
        price: "$10",
        period: "/month",
        features: [
            "100GB of storage",
            "30 days of audit log retention",
            "Regions",
            "Private Files",
        ],
    },
    {
        title: "Usage Based",
        description: "Usage-based pricing, starting at $25/mo for 250GB of included storage",
        price: "$25",
        period: "/month",
        features: [
            "250GB of included storage",
            "30 days of audit log retention",
            "$0.08 per GB over 250GB",
            "Regions",
            "Private Files",
        ],
    },
];


export default function Pricing() {
    return (
        <div className=" flex flex-col items-center justify-center relative py-20">
            {/* Curve top */}
            <div className="relative w-full h-28 bg-white -top-20"
                style={{ clipPath: "ellipse(70% 50% at top center)" }}>
            </div>
            <div className="flex flex-col items-center">
                <h1 className="text-6xl font-bold  text-center mt-2">
                    Worry about your app,
                    <br></br>
                    <span className="primary">

                        not your bill.
                    </span>
                </h1>
                <p className="text-lg text-gray-400 text-center pt-5">
                    We wanted pricing to be as simple as possible. No calculator needed. Need something else?
                    <a href="#" className="pl-1 text-red-500 hover:text-red-700 transition-colors duration-200">
                       Let&apos;s chat!
                    </a>
                </p>

            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-5 pt-12 px-6 w-4/5">
                {pricingPlans.map((plan, index) => (
                    <div key={index} className="bg-white h-[34rem] rounded-3xl p-10 shadow-lg w-[21.5rem] text-black">
                        <h2 className="text-2xl font-semibold">{plan.title}</h2>
                        <p className="pt-4 min-h-[4.2rem] text-gray-600 text-sm leading-6">{plan.description}</p>

                        <div className="pt-4 pb-6 flex items-baseline gap-x-1">
                            <span className="text-4xl text-gray-900 tracking-tight font-bold">{plan.price}</span>
                            <span className="text-gray-600 text-sm leading-6">{plan.period}</span>
                        </div>


                        <button className="w-full block px-3 py-2 border-1 text-sm border-red-200 primary font-semibold rounded-md hover:border-[#E91616] transition">
                            Get Started
                        </button>

                        <ul className="flex flex-grow flex-col justify-between pt-10">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex gap-x-3 leading-8">
                                    <span className="primary">✔</span>
                                    <span className="text-sm text-gray-500">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {plan.footnote && <p className="text-xs text-gray-500 pt-8">{plan.footnote}</p>}
                    </div>
                ))}
            </div>
            <p className="text-sm text-gray-400 text-center mono-text pt-6 muted-foreground">All Prices in USD</p>
        </div>
    );
};