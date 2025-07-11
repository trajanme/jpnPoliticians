import Link from 'next/link';

export const metadata = {
  title: 'よくある質問 | 国会議員検索サービス',
  description: '国会議員検索サービスに関するよくある質問と回答をご紹介します。',
};

export default function FAQPage() {
  const faqs = [
    {
      question: '議員の情報が間違っている、または不足している場合はどうすればよいですか？',
      answer: '議員の情報の修正や追加については、GitHubでプルリクエストを出していただくようお願いします。データの正確性を保つため、コミュニティによる確認プロセスを経て反映いたします。',
    },
    {
      question: '新しい議員を追加したい場合はどうすればよいですか？',
      answer: '新しい議員の追加についても、GitHubでプルリクエストを出していただくようお願いします。議員の基本情報（名前、政党、選挙区、生年月日など）を含めてご提案ください。',
    },
    {
      question: '議員の追加順番に何か意味はありますか？',
      answer: '議員の追加順番には特に意味はありません。データの収集状況や登録のタイミングによって順番が決まっており、政治的意図や優先順位を示すものではありません。',
    },
    {
      question: 'このサービスはどのような目的で作られましたか？',
      answer: '国会議員の情報を分かりやすく整理し、国民が政治に関心を持つきっかけとなることを目的としています。議員の年齢、性別、SNS利用状況などの統計情報も提供しています。',
    },
    {
      question: 'データの更新頻度はどのくらいですか？',
      answer: '現在、データは手動で更新しています。定期的な更新を心がけていますが、最新の情報については各政党の公式サイトや国会の公式情報も併せてご確認ください。',
    },
    {
      question: 'GitHubでのプルリクエストの出し方を教えてください',
      answer: 'GitHubアカウントをお持ちでない場合は、まずアカウントを作成してください。その後、当プロジェクトのリポジトリで「Fork」を作成し、データを修正・追加した後、プルリクエストを作成してください。詳細な手順については、GitHubの公式ドキュメントをご参照ください。',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* パンくずナビ */}
      <nav className="mb-8 text-sm">
        <ol className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
          <li>
            <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-200">
              ホーム
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 dark:text-white">よくある質問</li>
        </ol>
      </nav>

      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
          よくある質問
        </h1>

        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                Q. {faq.question}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                A. {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
          <h3 className="mb-3 text-lg font-semibold text-blue-900 dark:text-blue-100">
            お問い合わせ
          </h3>
          <p className="text-blue-800 dark:text-blue-200">
            その他のご質問やご意見がございましたら、GitHubのIssuesページでお気軽にお聞かせください。
          </p>
          <div className="mt-4">
            <a
              href="https://github.com/trajanme/jpnPoliticians/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              GitHub Issues を開く
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 