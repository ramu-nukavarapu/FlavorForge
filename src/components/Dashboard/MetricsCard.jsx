import { Package, TrendingUp, Users, Lightbulb } from 'lucide-react';

const icons = {
  Package,
  TrendingUp,
  Users,
  Lightbulb,
};

const MetricsCard = ({ title, value, growth, growthPhrase, icon }) => {
  const IconComponent = icons[icon];
  const isPositive = growth > 0;
  const growthClass = isPositive ? 'text-green-600' : 'text-red-600';
  const growthText = growth ? `+${growth}% from last month` : growthPhrase;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        {IconComponent && (
          <div className="p-2 bg-blue-100 text-blue-600 rounded-md">
            <IconComponent size={24} />
          </div>
        )}
      </div>
      {growthText && (
        <p className={`text-sm ${growthClass}`}>
          {growthText}
        </p>
      )}
    </div>
  );
};

export default MetricsCard;