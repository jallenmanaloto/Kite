FactoryBot.define do
    factory (:user_mailer) do
       
        id { 2 }
        name { "test01" }
        status { false }
        total_cash { 0.00 }
        total_stocks { 0.00 }
        profit { 0.00 }
        email { "test01@email.com" }
        equity { 0.00 }
    end
end