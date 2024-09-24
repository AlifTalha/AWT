import { useRouter } from 'next/router';

const BoxDetail = () => {
  const router = useRouter();
  const { id } = router.query;  

  return (
    <div>
      <h1>Box Details</h1>
      <p>You are viewing details for Box {id}</p>
    </div>
  );
};

export default BoxDetail;

