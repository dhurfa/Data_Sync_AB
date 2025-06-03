using WebsiteB.RepositoryInterface;

namespace WebsiteB.Kafka
{
    public class ConsumerHost : IHostedService
    {
        private readonly IServiceProvider _serviceProvider;

        public ConsumerHost(IServiceProvider service)
        {
            _serviceProvider = service;
        }
        public Task StartAsync(CancellationToken cancellationToken)
        {
            IServiceScope scope = _serviceProvider.CreateScope();
                var consumer = scope.ServiceProvider.GetRequiredService<IConsumerWrapper>();
                var topic = Environment.GetEnvironmentVariable("KAFKA_TOPIC");
                Task.Run(() => consumer.Consume(topic), cancellationToken);
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
         return Task.CompletedTask;
         }
    }
}