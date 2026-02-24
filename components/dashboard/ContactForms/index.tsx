import DashboardTtile from '@/components/reusable/DashboardTtile';
import React from 'react'
import ContactForms from './ContactForms'

export default function ContactFormsPage() {
  return (
    <div>
        <DashboardTtile
            baseTitle="Home"
            page="Contact Forms"
            heading="Manage contact forms"
            className="mb-8"
        />

        <ContactForms />
    </div>
    );
}
