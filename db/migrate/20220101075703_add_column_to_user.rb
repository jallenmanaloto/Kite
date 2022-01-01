class AddColumnToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :generate_confirmation_token, :string
    add_column :users, :confirmation_url, :string

  end
end
