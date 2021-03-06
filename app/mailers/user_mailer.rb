class UserMailer < ApplicationMailer
    default template_path: 'user_mailer'

    def approve_account(user)
        email = user.email.to_s
        token = user.confirmation_token
        mail(
            from: "support@kite.com",
            to: email, 
            subject: "Pending Account",
        )
    end

    def admin_approve(user)
        @email = user.email.to_s
        @token = user.confirmation_token
        mail(
            from: "support@kite.com",
            to: @email, 
            subject: "Account Approved",
        )
    end
end