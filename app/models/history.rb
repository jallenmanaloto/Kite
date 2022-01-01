class History < ApplicationRecord
  belongs_to :trader

  validates :transaction_name, inclusion: { in: %w(Buy Sell) }
  validates_presence_of :transaction_name, :stock_name, :symbol, :quantity, :price
end
