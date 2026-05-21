export default function Footer() {
  return (
    <footer className="border-t border-text-dim/10 py-12 bg-bg/50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

          {/* BRAND */}
          <div>
            <div className="flex items-baseline gap-1 font-bricolage font-bold text-lg mb-4">
              <span className="text-text">SADZYS</span>
              <span className="text-text/70">&nbsp;SINGLES</span>
            </div>

            <p className="text-sm text-text-muted max-w-xs mb-5">
              Every game day, sports betting tips delivered with complete transparency and consistent results.
            </p>

            {/* X SOCIAL LINK */}
            <a
              href="https://x.com/sadzyssingles?s=21&t=MzTma9zm5yShOSx-WTX01w"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-text-muted hover:text-blue transition-colors cursor-pointer group w-fit"
            >
              {/* X LOGO SVG */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 transition-transform group-hover:scale-110"
              >
                <path d="M18.244 2H21l-6.52 7.44L22 22h-6.828l-5.32-6.92L3.8 22H1l7.06-8.06L2 2h6.92l4.88 6.36L18.244 2zm-1.2 18h1.84L8.16 4H6.24l10.804 16z" />
              </svg>

              <span className="text-sm">
                Follow us on social media!
              </span>
            </a>
          </div>

          {/* LINKS */}
          <div className="grid grid-cols-2 gap-6">

            <div>
              <h4 className="font-semibold text-text mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-text-muted">
                <li>
                  <a href="#how-it-works" className="hover:text-blue transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#proof" className="hover:text-blue transition-colors">
                    Results
                  </a>
                </li>
                <li>
                  <a href="#multis" className="hover:text-blue transition-colors">
                    Join Now
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-text mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-text-muted">
                <li>
                  <a href="#" className="hover:text-blue transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="border-t border-text-dim/10 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">

            <p className="text-xs text-text-dim">
              © 2026 Sadzys Singles. All rights reserved.
            </p>

            <p className="text-xs text-text-dim text-center sm:text-right">
              Disclaimer: Sports betting involves risk. Always bet responsibly.
            </p>

          </div>
        </div>

      </div>
    </footer>
  )
}