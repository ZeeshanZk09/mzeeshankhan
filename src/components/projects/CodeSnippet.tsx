import React from 'react';

export default function CodeSnippet({
  code = `// Example: simple React hook\nfunction useCounter() {\n  const [count, setCount] = useState(0);\n  return { count, increment: () => setCount(c => c + 1) };\n}`,
}: {
  code?: string;
}) {
  return (
    <section id='code-snippet' className='py-8 px-10 sm:px-24'>
      <div className='max-w-4xl mx-auto'>
        <h3 className='text-2xl font-semibold mb-3'>Code Snippet</h3>
        <pre className='bg-gray-900 text-white p-4 rounded-md overflow-auto text-sm'>{code}</pre>
      </div>
    </section>
  );
}
