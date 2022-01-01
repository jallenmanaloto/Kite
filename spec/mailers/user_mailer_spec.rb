require "rails_helper"

RSpec.describe UserMailer, type: :mailer do
  user = FactoryBot.build(:user)
  let(:mail) { UserMailer.approve_account(user) }

  describe 'UserMailer' do
    context 'sends email to user' do
      it 'where email is equal to user email' do
        expect(mail.to).to eq([user.email])
      end

      it 'where sender is equal to support@project.com' do
        expect(mail.from).to eq(["support@project.com"])
      end

      it 'where subject is equal to Pending Account' do
        expect(mail.subject).to eq("Pending Account")
      end
    end
  end
end
