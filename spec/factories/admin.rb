FactoryBot.define do
    factory(:admin) do
        association :user
        name { "admin1" }
        email { "test01@email.com" }
        id { 1 }
    end
end