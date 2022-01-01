FactoryBot.define do
    factory (:trader) do
        association :user
        
        id { 1 }
        user_id { 1 }
        name { "test01" }
        status { "false" }
        total_cash { 0.00 }
        email { "test01@email.com" }
        equity { 0.00 }
    end
end