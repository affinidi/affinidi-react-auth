//PEX for requesting email type VC
const emailVc = {
  id: "vp_token_with_email_vc",
  input_descriptors: [
    {
      id: "email_vc",
      name: "Email VC type",
      purpose: "Check if VC type is correct",
      constraints: {
        fields: [
          {
            path: ["$.credentialSchema.id"],
            filter: {
              type: "string",
              pattern:
                "^https:\\/\\/schema\\.affinidi\\.com\\/EmailV1-0\\.json$",
            },
          },
        ],
      },
    },
  ],
};

//PEX for requesting both Email and UserProfile 
const emailAndProfileVC = {
  id: "vp_combined",
  submission_requirements: [
    {
      rule: "pick",
      count: 1,
      from: "A",
    },
    {
      rule: "pick",
      count: 1,
      from: "B",
    },
  ],
  input_descriptors: [
    {
      id: "github_developer_profile_vc",
      name: "GitHub Developer profile  VC type",
      purpose: "To get developer profile VC type",
      group: ["A"],
      constraints: {
        fields: [
          {
            path: ["$.credentialSchema.id"],
            filter: {
              type: "string",
              pattern:
                "^https:\\/\\/schema\\.affinidi\\.com\\/EmailV1-0\\.json$",
            },
          },
        ],
      },
    },
    {
      id: "personal_profile_vc",
      name: "Personal Profile VC type",
      purpose: "To get Personal Profile type",
      group: ["B"],
      constraints: {
        fields: [
          {
            path: ["$.credentialSchema.id"],
            filter: {
              type: "string",
              pattern:
                "^https:\\/\\/schema\\.affinidi\\.com\\/UserProfileV2-0\\.json$",
            },
          },
        ],
      },
    },
  ],
};


export const presentationDefinitions = {
  emailVc,
  emailAndProfileVC,
} as const;
