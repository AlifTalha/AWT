// import Link from "next/link";

// export default function Header() {
//   return (<>
//   <table>
//     <tbody>
//     <tr>
//     <td><Link href="/"> Home </Link> </td>
//       <td><Link href="user"> User </Link></td>
//       <td> Contact</td>
//       <td> <Link href="signup"> Registration </Link></td>
//       <td> login</td>
//     </tr>
//     </tbody>
//   </table>
//   </>
//   )
// }


import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 p-4">
      <table className="w-full text-white">
        <tbody>
          <tr>
            <td className="px-4">
              <Link href="/">Home</Link>
            </td>
            <td className="px-4">
              <Link href="/user">User</Link>
            </td>
            <td className="px-4">
              <Link href="/contact">Contact</Link>
            </td>
            <td className="px-4">
              <Link href="/signup">Registration</Link>
            </td>
            <td className="px-4">
              <Link href="/login">Login</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </header>
  );
}
