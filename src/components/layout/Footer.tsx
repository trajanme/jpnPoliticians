const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">国会議員検索サービス</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              衆議院・参議院の現職議員データを閲覧できる非公式サイトです。
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">お問い合わせ</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
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
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600 dark:border-gray-800 dark:text-gray-300">
          <p>© {new Date().getFullYear()} 国会議員検索サービス. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 