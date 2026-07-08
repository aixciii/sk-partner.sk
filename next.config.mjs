/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Staré ukrainské stránky → nové slovenské
      { source: '/pro-nas', destination: '/o-nas', permanent: true },
      { source: '/pro-nas/', destination: '/o-nas', permanent: true },
      { source: '/novyna', destination: '/', permanent: true },
      { source: '/novyna/', destination: '/', permanent: true },
      { source: '/polityka-konfidencijnosti', destination: '/gdpr', permanent: true },
      { source: '/polityka-konfidencijnosti/', destination: '/gdpr', permanent: true },
      { source: '/partnerska-programa', destination: '/o-nas', permanent: true },
      { source: '/partnerska-programa/', destination: '/o-nas', permanent: true },
      { source: '/servis-i-pidtrymka-sonyachnogo-obladnannya-deye-ukrayina', destination: '/podpora', permanent: true },
      { source: '/servis-i-pidtrymka-sonyachnogo-obladnannya-deye-ukrayina/', destination: '/podpora', permanent: true },
      { source: '/servis-i-pidtrymka-sonyachnogo-obladnannya-deye-ukrayina-2', destination: '/podpora', permanent: true },
      { source: '/servis-i-pidtrymka-sonyachnogo-obladnannya-deye-ukrayina-2/', destination: '/podpora', permanent: true },
      { source: '/sonyachna-energetyka-kontakty-deye-solar-postachalnyk-obladnannya-ukrayina', destination: '/o-nas', permanent: true },
      { source: '/sonyachna-energetyka-kontakty-deye-solar-postachalnyk-obladnannya-ukrayina/', destination: '/o-nas', permanent: true },
      // Staré WordPress URL
      { source: '/product-category/vsi-tovary', destination: '/katalog', permanent: true },
      { source: '/product-category/vsi-tovary/', destination: '/katalog', permanent: true },
      { source: '/wp-admin', destination: '/admin', permanent: true },
    ]
  },
}

export default nextConfig
