FactoryBot.define do
    factory(:stock) do
        association :trader

        name { "Tesla" }
        latest_price { 100 }
        change_percent { 4.1 }
        symbol { "TSLA" }
        company_logo { "url" }
        quantity { 1.1 }
        amount_bought { 10 }
        amount_sold { 0 }
    end
end