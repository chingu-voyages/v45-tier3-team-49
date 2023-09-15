'use client'

import {useRouter} from 'next/router'
import { useEffect, useState } from 'react';

function HealthRecord () {

    const router = useRouter();
    const {id} = router.query;

    const [healthRecords, setHealthRecords] = useState([]);

    useEffect(() => {
        async function getHealthRecords() {
            try {
                const res = await fetch(`/api/healthRecords/${id}`);
    
                if (res.ok) {
                    const data = await res.json();
                    setHealthRecords(data);
                } else {
                    console.error('Failed to get health records');
                } 
            } catch(error) {
                console.error('Error fetching health records:', error);
            }

            getHealthRecords();
        }
    }, [id]);

    return (
        <div>
            <h1>Health Categories</h1>

            <div>
                {healthRecords.map((record) => (
                    <div key={record.petId}>
                        <div>
                            {record.pet.petName}
                        </div>
                        <div>
                            {record.allergies}
                        </div>
                        <div>
                            {record.medication}
                        </div>
                        <div>
                            {record.vaccinations}
                        </div>
                        <div>
                            {record.chronicIssues}
                        </div>
                        <div>
                            {record.routineCheckup}
                        </div>
                        <div>
                            {record.exerciseRoutine}
                        </div>
                    </div>
                ))}
            </div>
            

        </div>
    )
};


export default HealthRecord;