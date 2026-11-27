import {cp,writeFile} from 'node:fs/promises'
const source = new URL('../studio/site/',import.meta.url)
const output = new URL('../dist/',import.meta.url)
await cp(new URL('assets/',source),new URL('assets/',output),{recursive:true})
for (const file of ['atelier.css','concept.css','plumbing.html','roofing.html','electrical.html','privacy.html']) {
  await cp(new URL(file,source),new URL(file,output))
}
const errorPage=`<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>Page unavailable | Manglo Studio</title><link rel="stylesheet" href="/atelier.css"></head><body><main class="shell privacy-page"><a class="contact-link" href="/">Manglo Studio</a><p class="overline" style="margin-top:50px">LET’S GET YOU BACK</p><h1 style="font-size:clamp(38px,8vw,64px)">A fresh chapter.</h1><p>This page is no longer available. Explore Manglo Studio or tell us about your next website.</p><a class="button button-blue" href="/">Explore the studio</a><p><a class="contact-link" href="/#book-demo">Book a demo</a></p></main></body></html>`
await writeFile(new URL('404.html',output),errorPage)
await writeFile(new URL('robots.txt',output),'User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: https://manglo.shop/sitemap.xml\n')
await writeFile(new URL('sitemap.xml',output),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://manglo.shop/</loc></url></urlset>\n')
console.log('Manglo Studio built at /. Retired toolkit and article pages are excluded.')
