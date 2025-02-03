import { Bell, CreditCard, FileText } from 'lucide-react'

interface NotificationItemProps {
    id: number;
    message: string;
    date: string;
    status: string;
    onClick: (id: number) => void;
}

export function NotificationItem({ id, message, date, status, onClick }: NotificationItemProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'Completed':
                return 'bg-green-100 text-green-800';
            case 'Upcoming':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }

    const getIcon = (status: string) => {
        switch (status) {
            case 'Pending':
                return <CreditCard className="h-6 w-6 text-yellow-500" />;
            case 'Completed':
                return <FileText className="h-6 w-6 text-green-500" />;
            case 'Upcoming':
                return <Bell className="h-6 w-6 text-blue-500" />;
            default:
                return <Bell className="h-6 w-6 text-gray-500" />;
        }
    }

    return (
        <div 
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer border-l-4 border-blue-500"
            onClick={() => onClick(id)}
        >
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    {getIcon(status)}
                </div>
                <div className="flex-grow">
                    <p className="text-gray-800 font-semibold">{message}</p>
                    <p className="text-sm text-gray-500">{date}</p>
                </div>
                <div className="flex-shrink-0">
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(status)}`}>
                        {status}
                    </span>
                </div>
            </div>
        </div>
    );
}
