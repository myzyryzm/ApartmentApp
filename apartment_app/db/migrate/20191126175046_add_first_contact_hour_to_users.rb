class AddFirstContactHourToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :first_contact_hour, :number
  end
end
