export const userInfo = [
    {
     email:'a@gmail.com',
     role:'employee'

     },
     {
        email:'hr@gmail.com',
        role:'hr'
     },
     {
        email: 'manager@gmail.com',
        role:'manager'
     }
]

export const leaveInfo = [
    {
      emp_id: 1,
      name: 'xy',
      details:[
        {
            leaveType: 'personal leave',
      from: '5-5-2024',
      to: '6-5-2024',
      total: 2,
      delegatedFor: 'supervisor',
      reasonsForLeave: 'family event',
      application_Date: '1-5-2024',
      status: 'pending',
        },
        {
            leaveType: 'remote work',
            from: '8-6-2024',
            to: '12-6-2024',
            total: 5,
            delegatedFor: 'hr',
            reasonsForLeave: 'personal commitments',
            application_Date: '3-6-2024',
            status: 'approved'
        },
        {
            leaveType: 'personal leave',
            from: '5-5-2024',
            to: '6-5-2024',
            total: 2,
            delegatedFor: 'supervisor',
            reasonsForLeave: 'family event',
            application_Date: '1-5-2024',
            status: 'pending',
        }
      ]
    },
    {
      emp_id: 2,
      name: 'abc',
      details:[
        {
            leaveType: 'personal leave',
      from: '5-5-2024',
      to: '6-5-2024',
      total: 2,
      delegatedFor: 'supervisor',
      reasonsForLeave: 'family event',
      application_Date: '1-5-2024',
      status: 'pending',
        },
        {
            leaveType: 'remote work',
            from: '8-6-2024',
            to: '12-6-2024',
            total: 5,
            delegatedFor: 'hr',
            reasonsForLeave: 'personal commitments',
            application_Date: '3-6-2024',
            status: 'approved'
        },
        {
            leaveType: 'personal leave',
            from: '5-5-2024',
            to: '6-5-2024',
            total: 2,
            delegatedFor: 'supervisor',
            reasonsForLeave: 'family event',
            application_Date: '1-5-2024',
            status: 'pending',
        }
      ]
    },
    {
      emp_id: 3,
      name: 'pqr',
      details:[
        {  
        leaveType: 'maternity leave',
        from: '1-4-2024',
        to: '30-4-2024',
        total: 30,
        delegatedFor: 'manager',
        reasonsForLeave: 'expecting a baby',
        application_Date: '15-3-2024',
        status: 'rejected'
    },
    {
        leaveType: 'personal leave',
        from: '5-5-2024',
        to: '6-5-2024',
        total: 2,
        delegatedFor: 'supervisor',
        reasonsForLeave: 'family event',
        application_Date: '1-5-2024',
        status: 'pending',
    },
    {
        leaveType: 'remote work',
        from: '8-6-2024',
        to: '12-6-2024',
        total: 5,
        delegatedFor: 'hr',
        reasonsForLeave: 'personal commitments',
        application_Date: '3-6-2024',
        status: 'approved'
    }
    ]
    },
    {
      emp_id: 4,
      name: 'lmn',
      details:[
        {
            leaveType: 'personal leave',
      from: '5-5-2024',
      to: '6-5-2024',
      total: 2,
      delegatedFor: 'supervisor',
      reasonsForLeave: 'family event',
      application_Date: '1-5-2024',
      status: 'pending',
        },
        {
            leaveType: 'remote work',
            from: '8-6-2024',
            to: '12-6-2024',
            total: 5,
            delegatedFor: 'hr',
            reasonsForLeave: 'personal commitments',
            application_Date: '3-6-2024',
            status: 'approved'
        },
        {
            leaveType: 'personal leave',
            from: '5-5-2024',
            to: '6-5-2024',
            total: 2,
            delegatedFor: 'supervisor',
            reasonsForLeave: 'family event',
            application_Date: '1-5-2024',
            status: 'pending',
        }
      ]
    },
    {
      emp_id: 5,
      name: 'ijk',
      details:[
        {
            leaveType: 'personal leave',
      from: '5-5-2024',
      to: '6-5-2024',
      total: 2,
      delegatedFor: 'supervisor',
      reasonsForLeave: 'family event',
      application_Date: '1-5-2024',
      status: 'pending',
        },
        {
            leaveType: 'remote work',
            from: '8-6-2024',
            to: '12-6-2024',
            total: 5,
            delegatedFor: 'hr',
            reasonsForLeave: 'personal commitments',
            application_Date: '3-6-2024',
            status: 'approved'
        },
        {
            leaveType: 'personal leave',
            from: '5-5-2024',
            to: '6-5-2024',
            total: 2,
            delegatedFor: 'supervisor',
            reasonsForLeave: 'family event',
            application_Date: '1-5-2024',
            status: 'pending',
        }
      ]
    },
  ];


  export  const manager_leave_data = {
    my:
      {
 leave_details: [
          {
            id:1,
            leaveType: "sick leave",
            from: "10-7-2024",
            to: "14-7-2024",
            total: 5,
            delegatedFor: "manager",
            reasonsForLeave: "illness",
            application_Date: "5-7-2024",
            status: "Approved"
          },
          {id:2,
            leaveType: "vacation",
            from: "20-8-2024",
            to: "27-8-2024",
            total: 8,
            delegatedFor: "manager",
            reasonsForLeave: "holiday",
            application_Date: "15-8-2024",
            status: "Pending"
          }
        ]
      }
    ,
    team: [
      {
        emp_id: 1,
        details: {
          name: "Magfur Rume",
          email: "rume@gmail.com",
          position: "Software Engineer",
          department: "Software Development"
        },
        leave_details: [
          {
            id:1,
            leaveType: "personal leave",
            from: "5-5-2024",
            to: "6-5-2024",
            total: 2,
            delegatedFor: "supervisor",
            reasonsForLeave: "family event",
            application_Date: "1-5-2024",
            status: "pending"
          },
          {id:2,
            leaveType: "personal leave",
            from: "5-5-2024",
            to: "6-5-2024",
            total: 2,
            delegatedFor: "supervisor",
            reasonsForLeave: "family event",
            application_Date: "1-5-2024",
            status: "pending"
          },
          {id:3,
            leaveType: "remote work",
            from: "8-6-2024",
            to: "12-6-2024",
            total: 5,
            delegatedFor: "hr",
            reasonsForLeave: "personal commitments",
            application_Date: "3-6-2024",
            status: "approved"
          },
          {id:4,
            leaveType: "personal leave",
            from: "5-5-2024",
            to: "6-5-2024",
            total: 2,
            delegatedFor: "supervisor",
            reasonsForLeave: "family event",
            application_Date: "1-5-2024",
            status: "pending"
          }
        ]
      },
      {
        emp_id: 2,
        details: {
          name: "Alice Smith",
          email: "alice.smith@example.com",
          position: "Data Analyst",
          department: "Data Analytics"
        },
        leave_details: [
          {
            id:1,
            leaveType: "sick leave",
            from: "10-7-2024",
            to: "14-7-2024",
            total: 5,
            delegatedFor: "manager",
            reasonsForLeave: "illness",
            application_Date: "5-7-2024",
            status: "approved"
          },
          {
            id:2,
            leaveType: "vacation",
            from: "20-8-2024",
            to: "27-8-2024",
            total: 8,
            delegatedFor: "manager",
            reasonsForLeave: "holiday",
            application_Date: "15-8-2024",
            status: "approved"
          }
        ]
      }
    ]
    
  }
  




  export const HR_leave_data = {
    my: {
      leave_details: [
        {
          id: 1,
          leaveType: "sick leave",
          from: "10-7-2024",
          to: "14-7-2024",
          total: 5,
          delegatedFor: "manager",
          reasonsForLeave: "illness",
          application_Date: "5-7-2024",
          status: "Approved"
        },
        {
          id: 2,
          leaveType: "vacation",
          from: "20-8-2024",
          to: "27-8-2024",
          total: 8,
          delegatedFor: "manager",
          reasonsForLeave: "holiday",
          application_Date: "15-8-2024",
          status: "Pending"
        }
      ]
    },
    team: {
      research_development_team: [
        {
          emp_id: 1,
          details:{
            name: "Magfur Rume",
            email: "rume@gmail.com",
            position: "Software Engineer",
            department: "Software Development",
          },
          leave_details: [
            {
              id: 1,
              leaveType: "personal leave",
              from: "5-5-2024",
              to: "6-5-2024",
              total: 2,
              delegatedFor: "supervisor",
              reasonsForLeave: "family event",
              application_Date: "1-5-2024",
              status: "Pending"
            },
            {
              id: 2,
              leaveType: "remote work",
              from: "8-6-2024",
              to: "12-6-2024",
              total: 5,
              delegatedFor: "hr",
              reasonsForLeave: "personal commitments",
              application_Date: "3-6-2024",
              status: "Approved"
            }
          ]
        },
        {
          emp_id: 2,
        details:{
          name: "Alice Smith",
          email: "alice.smith@example.com",
          position: "Data Analyst",
          department: "Data Analytics",
        },
          leave_details: [
            {
              id: 1,
              leaveType: "sick leave",
              from: "10-7-2024",
              to: "14-7-2024",
              total: 5,
              delegatedFor: "manager",
              reasonsForLeave: "illness",
              application_Date: "5-7-2024",
              status: "Approved"
            },
            {
              id: 2,
              leaveType: "vacation",
              from: "20-8-2024",
              to: "27-8-2024",
              total: 8,
              delegatedFor: "manager",
              reasonsForLeave: "holiday",
              application_Date: "15-8-2024",
              status: "Approved"
            }
          ]
        }
      ],

      planning_team: [
        {
          emp_id: 1,
          details:{
            name: "Magfur Rume",
            email: "rume@gmail.com",
            position: "Software Engineer",
            department: "Software Development",
          },
          leave_details: [
            {
              id: 1,
              leaveType: "personal leave",
              from: "5-5-2024",
              to: "6-5-2024",
              total: 2,
              delegatedFor: "supervisor",
              reasonsForLeave: "family event",
              application_Date: "1-5-2024",
              status: "Pending"
            },
            {
              id: 2,
              leaveType: "remote work",
              from: "8-6-2024",
              to: "12-6-2024",
              total: 5,
              delegatedFor: "hr",
              reasonsForLeave: "personal commitments",
              application_Date: "3-6-2024",
              status: "Approved"
            }
          ]
        },
        {
          emp_id: 2,
        details:{
          name: "Alice Smith",
          email: "alice.smith@example.com",
          position: "Data Analyst",
          department: "Data Analytics",
        },
          leave_details: [
            {
              id: 1,
              leaveType: "sick leave",
              from: "10-7-2024",
              to: "14-7-2024",
              total: 5,
              delegatedFor: "manager",
              reasonsForLeave: "illness",
              application_Date: "5-7-2024",
              status: "Approved"
            },
            {
              id: 2,
              leaveType: "vacation",
              from: "20-8-2024",
              to: "27-8-2024",
              total: 8,
              delegatedFor: "manager",
              reasonsForLeave: "holiday",
              application_Date: "15-8-2024",
              status: "Approved"
            }
          ]
        }
      ],

      
    }
  };




  export const employee_data={
    profile:{
          name: "Alice Smith",
          email: "alice.smith@example.com",
          position: "Data Analyst",
          department: "Data Analytics"
    },
    leave_details: [
      {
        id:1,
        leaveType: "sick leave",
        from: "10-7-2024",
        to: "14-7-2024",
        total: 5,
        delegatedFor: "manager",
        reasonsForLeave: "illness",
        application_Date: "5-7-2024",
        status: "approved",
        logs:[
          {
            "sender": "koushik vhai",
            "date": "5-7-2024",
            "status": "request more information",
            "comments": "give some more files"
          },
          {
            "sender": "Jane Doe",
            "date": "5-8-2024",
            "status": "request more information",
            "comments": "Please provide clarification on section 2"
          },
          {
            "sender": "John Smith",
            "date": "5-9-2024",
            "status": "approved",
            "comments": "Looks good, proceed with implementation"
          },
          {
            "sender": "Alex Johnson",
            "date": "5-10-2024",
            "status": "rejected",
            "comments": "Not meeting requirements, please revise"
          }
        ]
        
      },
      {
        id:2,
        leaveType: "vacation",
        from: "20-8-2024",
        to: "27-8-2024",
        total: 8,
        delegatedFor: "manager",
        reasonsForLeave: "holiday",
        application_Date: "15-8-2024",
        status: "approved" ,
        logs:[
          {
            "sender": "Sarah Lee",
            "date": "6-15-2024",
            "status": "pending review",
            "comments": "Awaiting feedback from the team"
          },
          {
            "sender": "Michael Chen",
            "date": "6-18-2024",
            "status": "in progress",
            "comments": "Started working on the assigned tasks"
          },
          {
            "sender": "Emily Wang",
            "date": "6-20-2024",
            "status": "completed",
            "comments": "All tasks finished successfully"
          },
          {
            "sender": "David Brown",
            "date": "6-22-2024",
            "status": "pending approval",
            "comments": "Ready for management review"
          }
        ]
        
      }
    ]

  }
  


