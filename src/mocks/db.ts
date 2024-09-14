export interface Location {
  id: number;
  name: string;
  is_starred: boolean;
  robot: {
    id: string;
    is_online: boolean;
  };
}

export const locations: Location[] = [
  // Please add more locations to show features
  {
    id: 0,
    name: "Spicy restaurant",
    is_starred: false,
    robot: {
      id: "",
      is_online: true,
    },
  },
  {
    id: 1,
    name: "Salty restaurant",
    is_starred: false,
    robot: {
      id: "Pennybot-fghij456",
      is_online: false,
    },
  },
  {
    id: 2,
    name: "Kimbap Heaven",
    is_starred: false,
    robot: {
      id: "Pennybot-1",
      is_online: true,
    },
  },
  {
    id: 3,
    name: "Yugane",
    is_starred: false,
    robot: {
      id: "Pennybot-2",
      is_online: true,
    },
  },
  {
    id: 4,
    name: "Kimgane",
    is_starred: true,
    robot: {
      id: "Pennybot-3",
      is_online: true,
    },
  },
  {
    id: 5,
    name: "Daily Picks",
    is_starred: true,
    robot: {
      id: "Pennybot-4",
      is_online: true,
    },
  },
  {
    id: 6,
    name: "Burger King",
    is_starred: false,
    robot: {
      id: "",
      is_online: true,
    },
  },
  {
    id: 7,
    name: "Noodle King",
    is_starred: false,
    robot: {
      id: "Pennybot-6",
      is_online: false,
    },
  },
  {
    id: 8,
    name: "Army Soup restaurant",
    is_starred: false,
    robot: {
      id: "Pennybot-7",
      is_online: false,
    },
  },
  {
    id: 9,
    name: "Pasta boy",
    is_starred: false,
    robot: {
      id: "Pennybot-8",
      is_online: false,
    },
  },
  {
    id: 10,
    name: "Crazy pizza",
    is_starred: false,
    robot: {
      id: "",
      is_online: false,
    },
  },
  {
    id: 11,
    name: "Crazy Tteokbokki",
    is_starred: false,
    robot: {
      id: "Pennybot-abcde123",
      is_online: true,
    },
  },
];
