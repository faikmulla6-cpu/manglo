export default function AdminLayout({children}:{children:React.ReactNode}){
 return <><style>{`body.site-body>header,body.site-body>footer{display:none!important}body.site-body{background:#0d0f12!important}`}</style>{children}</>;
}
