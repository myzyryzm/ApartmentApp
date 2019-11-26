class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  has_many :apartments
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :phone_number, presence: true
  validates :first_contact_hour, presence: true
  validates :first_contact_hour_period, presence: true
  validates :end_contact_hour, presence: true
  validates :end_contact_hour_period, presence: true
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
