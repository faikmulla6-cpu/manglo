import Link from 'next/link';

export default function AdminLayout({children}:{children:React.ReactNode}){
 return <><style>{`body.site-body>header,body.site-body>footer{display:none!important}body.site-body{background:#0d0f12!important}.admin-review-link{position:fixed;right:14px;bottom:14px;z-index:60;text-decoration:none;border:1px solid #5b4728;background:#1b1811;color:#e3bd72;border-radius:9px;padding:9px 11px;font-size:9px;font-weight:850;box-shadow:0 8px 30px rgba(0,0,0,.35)}.admin-review-link:hover{background:#252015}@media(max-width:760px){.admin-review-link{right:10px;bottom:10px}}`}</style>{children}<Link href="/admin/submissions" className="admin-review-link">Review uncertain orders</Link></>;
}
