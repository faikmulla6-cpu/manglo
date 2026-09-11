export const rupees=(paise:bigint|number)=>`₹${(Number(paise)/100).toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2})}`;
// Keep pricing transparent: add ₹0.50 to services below ₹10/1K and ₹1 otherwise.
export function retailRate(providerPaise:number){return providerPaise+(providerPaise<1000?50:100)}
