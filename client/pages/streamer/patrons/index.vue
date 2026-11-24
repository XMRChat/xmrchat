<template>
  <div>
    <PageTitle
      title="Patrons"
      description="Patrons are your supporters that pay for membership. You can encourage your fans to become supporting members by offering recognition during your shows. Patrons also receive a star icon next to their xmrchats. And, the names chosen by Patrons can only be used by them, others are prevented from using names in use by active members"
    />
    <div class="flex flex-col gap-20">
      <MembershipLevels />
      <PatronMessages />
      <ActiveMemberships />
      <ExpiredMemberships />
    </div>
  </div>
</template>
