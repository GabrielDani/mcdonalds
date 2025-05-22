

export function formatCurrency(price_in_cents: number) {
    return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(price_in_cents/100)
}