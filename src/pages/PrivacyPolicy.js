import React , {useEffect}from 'react';
import { Footer, Header } from './AcceptableUseNotice';

//TODO: header
function PrivacyPolicy() {
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  return (
    <div className="terms-container">
        <div>
            <Header />
        <div className='p-8'>
      <h1>Privacy Policy</h1>
      <p>
        EthnicEats ("we", "us", or "our") is committed to protecting the privacy of
        our users ("you", "your", or "yours"). This Privacy Policy explains what
        information we collect, how we use it, and how we protect it.
      </p>
      <h2>Information We Collect</h2>
      <p>We collect two types of information from our users: </p>
      <ul>
        <li>
          <strong>Personal Information:</strong> This information you provide directly to us,
          such as your name, email address, and location (if provided). This
          information is collected when you create an account, sign up for our
          services, or contact us.
        </li>
        <li>
          <strong>Non-Personal Information:</strong> This information is collected automatically
          when you use our website. This may include your IP address, browser
          type, operating system, the pages you visit on our website, and the
          dates and times of your visits.
        </li>
      </ul>
      <h2>How We Use Your Information</h2>
      <p>We use the information we collect for the following purposes:</p>
      <ul>
        <li>To provide and personalize our services to you.</li>
        <li>
          To send you marketing and promotional communications, but only if you
          consent to receive them.
        </li>
        <li>To analyze the use of our website and improve our services.</li>
        <li>To address any customer service issues.</li>
      </ul>
      <h2>Data Sharing and Disclosure</h2>
      <p>
        We will not share your personal information with any third party except
        in the following circumstances:
      </p>
      <ul>
        <li>
          With service providers who help us operate our website and provide our
          services. These service providers are contractually obligated to keep
          your information confidential.
        </li>
        <li>
          To comply with legal or regulatory requirements. This may include
          disclosing your information to law enforcement agencies or other
          government officials.
        </li>
        <li>
          In the event of a merger, acquisition, or sale of all or a part of
          our assets, your information may be transferred to the new owner.
        </li>
      </ul>
      <h2>Data Retention</h2>
      <p>
        We will retain your personal information for as long as necessary to
        provide you with our services and comply with legal or regulatory
        requirements.
      </p>
      <h2>Your Choices</h2>
      <p>
        You have the following choices regarding your information:
      </p>
      <ul>
        <li>You can access and update your personal information at any time.</li>
        <li>
          You can opt out of receiving marketing and promotional communications
          from us.
        </li>
        <li>You can request that we delete your personal information.</li>
      </ul>
      <h2>Security</h2>
      <p>
        We take reasonable steps to protect your information from unauthorized
        access, disclosure, alteration, or destruction. However, no website or
        internet transmission is completely secure.
      </p>
      <h2>Changes to this Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will post any
        changes on this page and encourage you to review it periodically.
      </p>
      <h2>Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at:
      </p>
      <ul>
        <li>Email: hello@ethniceats.co.uk</li>
      </ul>
      </div>
    </div>
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
