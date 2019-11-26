class AddFirstContactHourPeriodToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :first_contact_hour_period, :string
  end
end
