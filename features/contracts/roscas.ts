export type GroupSpaceInfo = {
	spaceId: string;
	name: string;
	admin: Address;
	token: Address;
	payoutAmount: number;
	interval: number;
	startDate: number;
	memberCount: number;
};

export const frequencyOptions = [
	{
		frequency: "Weekly",
		desc: "Every 7 days",
		interval: 604800,
	},
	{
		frequency: "2 Weeks",
		desc: "Every 14 days",
		interval: 1209600,
	},
	{
		frequency: "3 Weeks",
		desc: "Every 21 days",
		interval: 1814400,
	},
	{
		frequency: "Monthly",
		desc: "Every 28 days",
		interval: 2419200,
	},
	{
		frequency: "2 Months",
		desc: "Every 56 days",
		interval: 4838400,
	},
];
