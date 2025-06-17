const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold">参議院選挙情報</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              参議院選挙に関する情報を、公平・中立な立場で提供します。
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">リンク</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.sangiin.go.jp/japanese/joho1/kousei/giin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  参議院議員一覧
                </a>
              </li>
              <li>
                <a
                  href="https://www.soumu.go.jp/senkyo/senkyo_s/news/senkyo/senkyo.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  総務省選挙情報
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">お問い合わせ</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ご意見・ご要望は
              <a
                href="https://github.com/yourusername/3in1000v2025/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                GitHub Issues
              </a>
              までお願いします。
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600 dark:border-gray-800 dark:text-gray-400">
          <p>© {new Date().getFullYear()} 参議院選挙情報. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 