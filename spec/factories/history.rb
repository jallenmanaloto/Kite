FactoryBot.define do
    factory(:history) do
        association :trader

        transaction_name { "Sell" }
        stock_name { "Tesla" }
        symbol { "TSLA" }
        quantity { "10" }
        price { "100" }
    end
end