class AddColumnsToHistory < ActiveRecord::Migration[6.1]
  def change
    add_column :histories, :amount_bought, :integer
    add_column :histories, :amount_sold, :integer
  end
end
