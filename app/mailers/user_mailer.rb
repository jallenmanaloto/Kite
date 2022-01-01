class UserMailer < ApplicationMailer
    default template_path: 'user_mailer'

    def approve_account(user)
        email = user.email.to_s
        token = user.confirmation_token
        mail(
            from: "support@project.com",
            to: email, 
            subject: "Pending Account",
        )
    end
end