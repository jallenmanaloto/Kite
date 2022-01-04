class AddSearchToMarket < ActiveRecord::Migration[6.1]
  def change
    add_column :markets, :search, :string
  end
end
