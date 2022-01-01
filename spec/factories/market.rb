FactoryBot.define do
    factory(:market) do
       symbol { "A" }
       exchange { "XNYS" }
       exchangeSuffix { "" }
       exchangeName { "New York Stock Exchange Inc" }
       name { "Agilent Technologies Inc." }
    end
end