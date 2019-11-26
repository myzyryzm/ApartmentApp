class AddEndContactHourPeriodToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :end_contact_hour_period, :string
  end
end
