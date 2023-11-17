

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <p>Thanks for joining our community!</p>
  </div>
);

// Invite Email Template
// Path: app/components/emailTemplates.tsx
interface InviteEmailTemplateProps {
  userFirstName: string;
  requestTitle: string;
  inviteLink: string;
}

export const InviteEmailTemplate: React.FC<
  Readonly<InviteEmailTemplateProps>
> = ({ userFirstName, requestTitle, inviteLink }) => (
  <div>
    <h1>Hello!</h1>
    <p>
      {userFirstName} has just invited you to provide content for {requestTitle}
    </p>
    <p>Click the link below to start adding content now!</p>
    <a
      href={inviteLink}
      style={{
        backgroundColor: "#222222",
        color: "#fff",
        padding: "10px 20px",
        marginTop: "20px",
        borderRadius: "5px",
        textDecoration: "none",
      }}
    >
      Submit Content Now
    </a>
  </div>
);

// Reset Password Email Template
// Path: app/components/emailTemplates.tsx
