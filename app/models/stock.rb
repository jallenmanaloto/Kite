class Stock < ApplicationRecord
    belongs_to :trader

    validates_presence_of :name, :latest_price, :change_percent, :symbol, :company_logo, :quantity

    @@client = IEX::Api::Client.new(
        publishable_token: 'pk_a020ad363b0b447185bf2db1cfd11154',
        secret_token: 'sk_4e277e5f5d884ae987d56fca67577a68',
        endpoint: 'https://cloud.iexapis.com/v1'
    )

    def latest_price
        quote = @@client.quote(self.symbol)
        quote.latest_price
    end

    def change_percent
        quote = @@client.quote(self.symbol)
        quote.change_percent
    end

    def calculate_quantity(shares)
        if self.quantity == nil
            self.quantity = 0
            current_quantity = self.quantity
            self.quantity = current_quantity + shares
        else
            current_quantity = self.quantity
            self.quantity = current_quantity + shares
        end
    end

    def cash_value
       self.latest_price * self.quantity
    end

    def company_name
        company = @@client.company(self.symbol)
        company.company_name
    end

    def sell_stock(quantity)
        # deduct amount of quantity to be sold
        # calculate equity and add to trader's total_cash
        # current_cash_value = self.quantity - cash_value
        # self.quantity = current_cash_value
        self.quantity - quantity
    end
end
