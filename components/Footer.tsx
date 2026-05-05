const footerLinks = {
  About: ["How it works", "Featured", "Partnership", "Business Relation"],
  Community: ["Events", "Blog", "Podcast", "Invite a friend"],
  Socials: ["Discord", "Instagram", "Twitter", "Facebook"],
};

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 w-full px-6 mt-8 transition-colors duration-300 border-t border-gray-100 dark:border-gray-800">
      <div className="w-full py-12">
        <div className="flex flex-col md:flex-row justify-between gap-10">

          {/* Left — Logo + tagline */}
          <div className="max-w-[240px]">
            <span className="text-[#3563E9] font-bold text-2xl tracking-wide">MORENT</span>
            <p className="text-gray-400 text-sm leading-relaxed mt-4">
              Our vision is to provide convenience and help increase your sales business.
            </p>
          </div>

          {/* Right — Link columns */}
          <div className="flex flex-wrap gap-10 md:gap-20">
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <h4 className="font-semibold text-gray-900 dark:text-white text-base mb-6">{heading}</h4>
                <ul className="flex flex-col gap-4">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-400 text-sm hover:text-[#3563E9] transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100 dark:border-gray-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">©2022 MORENT. All rights reserved</span>
        <div className="flex gap-8">
          <a href="#" className="text-gray-700 dark:text-gray-300 text-sm font-semibold hover:text-[#3563E9] transition-colors">Privacy & Policy</a>
          <a href="#" className="text-gray-700 dark:text-gray-300 text-sm font-semibold hover:text-[#3563E9] transition-colors">Terms & Condition</a>
        </div>
      </div>
    </footer>
  );
}
