# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  has_one :admin
  has_one :trader
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
  include DeviseTokenAuth::Concerns::User
  validates :name, length: { minimum: 5, maximum: 20 }
  validates_presence_of :name, :email, :password

  # before_action :skipping_confirm

  # def skipping_confirm
  #   self.skip_confirmation!
  # end

  # def send_pending
  #   UserMailer.approve_account(self).deliver_later
  # end
end
