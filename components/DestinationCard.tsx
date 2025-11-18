import Image from 'next/image';
import { Destination } from '@/types';
import { MapPin, TrendingUp } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <div className="card group cursor-pointer hover:shadow-lg transition-shadow overflow-hidden p-0">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center space-x-1">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <span className="text-sm font-semibold text-gray-900">{destination.popularityScore}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{destination.name}</h3>
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{destination.country}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{destination.description}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Best time:</span>
          <span className="font-medium text-gray-900">
            {destination.bestMonths.slice(0, 2).join(', ')}
          </span>
        </div>
      </div>
    </div>
  );
}
