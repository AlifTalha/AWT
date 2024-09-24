

import Link from 'next/link';

const Box = ({ boxNumber }) => {
  return (
    <div style={{ padding: '20px', border: '1px solid black', margin: '5px' }}>
      <Link href={`/box/${boxNumber}`} legacyBehavior>
        <a>Box {boxNumber}</a>
      </Link>
    </div>
  );
};

export default Box;
