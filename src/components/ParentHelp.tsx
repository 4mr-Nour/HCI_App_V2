import { HelpCircle, Book, UserCog, Mail } from 'lucide-react';

export function ParentHelp() {
    const categories = [
        {
            title: 'Getting Started',
            icon: Book,
            color: '#4A90E2',
            description: 'New to the app? Start here to learn the basics.',
            items: [
                'How to navigate the dashboard',
                'Setting up your child\'s profile',
                'Understanding the learning path'
            ]
        },
        {
            title: 'Managing Account',
            icon: UserCog,
            color: '#F475A8',
            description: 'Learn how to manage your parent and child accounts.',
            items: [
                'Changing your password',
                'Updating personal information',
                'Managing subscription plans'
            ]
        },
        {
            title: 'Understanding Reports',
            icon: HelpCircle,
            color: '#7BC67E',
            description: 'Guide to interpreting your child\'s progress reports.',
            items: [
                'Reading the progress charts',
                'Understanding subject scores',
                'Exporting report data'
            ]
        }
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#4A90E2] to-[#7BC67E] rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)] text-white">
                <h2 className="text-white m-0 mb-2 text-[32px]">Help & Documentation</h2>
                <p className="text-white opacity-90 m-0 text-[18px]">
                    Find answers to common questions and learn how to make the most of the app.
                </p>
            </div>

            {/* Categories Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                {categories.map((category, index) => {
                    const Icon = category.icon;
                    return (
                        <div key={index} className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all">
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                                style={{ backgroundColor: `${category.color}20` }}
                            >
                                <Icon className="w-6 h-6" style={{ color: category.color }} />
                            </div>
                            <h3 className="text-[#333333] m-0 mb-2 text-[20px]">{category.title}</h3>
                            <p className="text-[#333333] opacity-60 m-0 mb-4 text-[16px]">
                                {category.description}
                            </p>
                            <ul className="space-y-2">
                                {category.items.map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-[#4A90E2] text-[15px] cursor-pointer hover:underline">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#4A90E2]"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <h3 className="text-[#333333] m-0 mb-6 text-[24px]">Frequently Asked Questions</h3>
                <div className="divide-y divide-gray-100">
                    {[
                        { q: 'How do I reset my password?', a: 'Go to Settings > Account > Change Password to update your login credentials.' },
                        { q: 'Can I add multiple children?', a: 'Yes! You can add up to 3 child profiles under a standard subscription.' },
                        { q: 'Is the content safe for kids?', a: 'Absolutely. All content is curated by educators and is 100% child-safe and ad-free.' }
                    ].map((faq, index) => (
                        <div key={index} className="py-4 first:pt-0 last:pb-0">
                            <h4 className="text-[#333333] m-0 mb-2 text-[18px] font-medium">{faq.q}</h4>
                            <p className="text-[#333333] opacity-70 m-0 text-[16px]">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Support */}
            <div className="bg-[#FFF8E7] rounded-[24px] p-8 border-2 border-[#F8D93B] flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-[#F8D93B] rounded-full flex items-center justify-center text-white">
                        <Mail className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-[#333333] m-0 mb-1 text-[22px]">Still need help?</h3>
                        <p className="text-[#333333] opacity-70 m-0 text-[18px]">
                            Our support team is available 24/7 to assist you.
                        </p>
                    </div>
                </div>
                <button className="bg-[#333333] text-white px-8 py-4 rounded-[20px] font-medium text-[18px] hover:bg-black transition-colors cursor-pointer border-none">
                    Contact Support
                </button>
            </div>
        </div>
    );
}
